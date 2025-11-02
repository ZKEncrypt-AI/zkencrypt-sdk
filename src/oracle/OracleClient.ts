import axios from 'axios';
import { OracleQueryOptions, OracleResult } from '../types';

export class OracleClient {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async query(options: OracleQueryOptions): Promise<OracleResult> {
    const response = await axios.post(`${this.endpoint}/query`, {
      model: options.model,
      prompt: options.prompt,
      encrypted: options.encrypted,
      maxTokens: options.maxTokens || 100,
    });

    return {
      data: response.data.response,
      encrypted: options.encrypted || false,
    };
  }

  async queryBatch(queries: OracleQueryOptions[]): Promise<OracleResult[]> {
    const results: OracleResult[] = [];
    
    for (const query of queries) {
      const result = await this.query(query);
      results.push(result);
    }

    return results;
  }
}
