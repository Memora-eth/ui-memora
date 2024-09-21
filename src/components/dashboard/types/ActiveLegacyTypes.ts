export interface RawNFTData {
    0: `0x${string}`; 
    1: `0x${string}`; 
    2: boolean; 
    3: boolean; 
    4: `0x${string}`; 
    5: string;  
    6: number;  
    7: number;  
    8: bigint;  
    9: string;  
}

export interface NFTData {
    id: bigint | null;
    judge: `0x${string}`
    heir: `0x${string}`
    isTriggerDeclared: boolean,
    isHeirSigned: boolean,
    minter: `0x${string}`,
    prompt: string,
    actions: number,
    triggerTimestamp: number,
    balance: bigint,
    uri: string,
    image: string
}