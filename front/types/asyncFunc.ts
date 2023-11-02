export type AsyncFunc<Params = unknown, ReturnType = void> = (params: Params) => Promise<ReturnType>
