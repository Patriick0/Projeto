import { GoogleGenAI, Type } from "@google/genai";
import { ReportData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Using Gemini 3 Flash for speed/efficiency
const MODEL_NAME = 'gemini-3-flash-preview';

export const analyzeReport = async (report: ReportData) => {
  try {
    const prompt = `
      Você é um assistente de segurança para um app de transporte público.
      Analise a seguinte denúncia e forneça um resumo curto para o painel de controle e um nível de prioridade (1 a 5).
      
      Dados da denúncia:
      Categoria: ${report.category}
      Subcategoria: ${report.subCategory || 'N/A'}
      Linha: ${report.lineId}
      Veículo: ${report.vehicleId}
      Descrição: ${report.description}
      Modo Discreto Usado: ${report.isDiscrete ? 'SIM' : 'NÃO'}
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "Resumo de uma frase para o operador" },
            priority: { type: Type.INTEGER, description: "1 (Baixa) a 5 (Crítica/Emergência)" },
            advice: { type: Type.STRING, description: "Conselho imediato para o usuário (curto)" }
          },
          required: ["summary", "priority", "advice"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text);

  } catch (error) {
    console.error("Error analyzing report:", error);
    return {
      summary: "Denúncia recebida. Análise pendente.",
      priority: 3,
      advice: "Obrigado por reportar. Mantenha-se seguro."
    };
  }
};

export const fetchBusLineRanking = async (uf: string = 'MG', city: string = 'Belo Horizonte') => {
  try {
    const prompt = `
      Gere um JSON contendo uma lista fictícia, mas realista baseada em dados comuns de transporte público, das 5 linhas de ônibus (ou metrô/trem) de ${city} - ${uf} com o maior número de reclamações nas últimas 24 horas.
      
      Importante: Use nomes de linhas ou números reais se souber, ou invente formatos plausíveis para a cidade especificada.
      
      Para cada item, inclua:
      - lineId: identificação da linha (ex: número ou nome)
      - totalReports: número de reclamações (entre 10 e 100)
      - mainIssue: principal motivo (ex: Atraso, Superlotação, Segurança, Ar condicionado)
      - trend: "UP" (subindo), "DOWN" (descendo) ou "STABLE" (estável)
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            ranking: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  lineId: { type: Type.STRING },
                  totalReports: { type: Type.INTEGER },
                  mainIssue: { type: Type.STRING },
                  trend: { type: Type.STRING, enum: ["UP", "DOWN", "STABLE"] }
                }
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return { ranking: [] };
    return JSON.parse(text);

  } catch (error) {
    console.error("Error fetching ranking:", error);
    return { ranking: [] };
  }
};

export const fetchRegionStats = async () => {
  try {
    const prompt = `
      Gere um JSON com estatísticas de denúncias para as 9 regionais de Belo Horizonte (Barreiro, Centro-Sul, Leste, Nordeste, Noroeste, Norte, Oeste, Pampulha, Venda Nova).
      Para cada regional, forneça:
      - id: nome da regional em lowercase sem acento (ex: 'barreiro', 'centro-sul')
      - name: Nome formatado (ex: Barreiro)
      - complaints: número de denúncias nas últimas 24h (0 a 100)
      - riskLevel: "LOW" (Verde), "MEDIUM" (Amarelo), "HIGH" (Vermelho)
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            regions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  complaints: { type: Type.INTEGER },
                  riskLevel: { type: Type.STRING, enum: ["LOW", "MEDIUM", "HIGH"] }
                }
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return { regions: [] };
    return JSON.parse(text);

  } catch (error) {
    console.error("Error fetching regions:", error);
    return { regions: [] };
  }
};