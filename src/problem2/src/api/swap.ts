import type { RawToken } from '../types/common';
import axiosIntance from './axios-instance';


export const getTokens = async (): Promise<RawToken[]> => {
  try {
    const { data } = await axiosIntance.get<RawToken[]>('/prices.json');
    return data?.filter((token, index, self) =>
      index === self.findIndex(t => t.currency === token.currency)
    ) ?? []
  } catch (error) {
    console.error('Error fetching token prices:', error);
    throw error;
  }
};

