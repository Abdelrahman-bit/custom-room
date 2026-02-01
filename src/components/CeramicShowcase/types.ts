// Goal: Support Categories -> List of Textures

export type DesignType = 'color' | 'texture';
export type TilePattern = 'grid';

export interface CeramicVariant {
  id: string;
  name: string;
  type: DesignType;
  pattern: TilePattern;
  color?: string;
  textureUrl?: string;
  thumbnailUrl?: string;
  roughness: number;
  metalness: number;
  tileRepeat?: number;
}

export interface CeramicCategory {
  id: string;
  name: string;
  thumbnailUrl?: string;
  variants: CeramicVariant[];
}
