import { computed } from 'vue'

export function useSoftMax(value: number, fromValues: number[]): number {
  const sum = fromValues.reduce((acc, value) => acc + Math.exp(value), 0)
  return Math.exp(value) / sum
}

export function normalize(value: number, ofValues: number[]) {
  const max = Math.max(...ofValues)
  const min = Math.min(...ofValues)
  const range = max - min
  return (value - min) / range
}

export function useNormalize(value: number, fromValues: number[]) {
  return computed(() => {
    return normalize(value, fromValues)
  })
}
