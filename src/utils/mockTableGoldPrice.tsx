interface DataType {
  key: string;
  goldType: string;
  buyPrice: number;
  sellPrice: number;
}

const mockTableGoldPrice: DataType[] = [
  {
    key: '1',
    goldType: 'VÀNG 24K',
    buyPrice: 10760000,
    sellPrice: 10820000,
  },
  {
    key: '2',
    goldType: 'TRANG SỨC 23K',
    buyPrice: 10680000,
    sellPrice: 10800000,
  },
  {
    key: '3',
    goldType: 'VÀNG 18K',
    buyPrice: 7700000,
    sellPrice: 9400000,
  },
  {
    key: '4',
    goldType: 'VÀNG 16K',
    buyPrice: 6850000,
    sellPrice: 6900000,
  },
  {
    key: '5',
    goldType: 'VÀNG 10K',
    buyPrice: 4350000,
    sellPrice: 4950000,
  },
  {
    key: '6',
    goldType: 'BẠC',
    buyPrice: 80000,
    sellPrice: 120000,
  },
]

export default mockTableGoldPrice;