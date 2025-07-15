'use client';

import { useEffect, useState } from 'react';
import { getGoldPrice, editGoldPrice } from '@/services/EditGoldPriceService';
import { toast } from 'sonner';

interface DataType {
  _id: string;
  goldtype: string;
  buyprice: number;
  sellprice: number;
}

export default function EditGoldPricePlainTable() {
  const [data, setData] = useState<DataType[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<DataType>>({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await getGoldPrice();
      setData(
        res.map((item: DataType) => ({
          _id: item._id,
          goldtype: item.goldtype,
          buyprice: Number(item.buyprice),
          sellprice: Number(item.sellprice),
        }))
      );
    };
    fetchData();
  }, []);

  const startEdit = (item: DataType) => {
    setEditingId(item._id);
    setEditValues({ buyprice: item.buyprice, sellprice: item.sellprice });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({});
  };

  const saveEdit = async (record: DataType) => {
    const updated = { ...record, ...editValues };
    try {
      await editGoldPrice(updated);
      setData((prev) =>
        prev.map((item) =>
          item._id === record._id ? { ...item, ...editValues } : item
        )
      );
      toast.success('Cập nhật thành công');
    } catch (error) {
      console.error('Lỗi khi cập nhật:', error);
      toast.error('❌ Cập nhật thất bại');
    }
    setEditingId(null);
    setEditValues({});
  };

  const handleInput = (field: keyof DataType, value: string) => {
    setEditValues((prev) => ({
      ...prev,
      [field]: Number(value),
    }));
  };

  // Hiển thị dạng thẻ cho mobile
  const renderMobileCard = (item: DataType) => {
    const isEditing = editingId === item._id;
    
    return (
      <div key={item._id} className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200">
        <div className="font-medium text-lg mb-2">{item.goldtype}</div>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <div className="text-sm text-gray-500">Mua vào:</div>
            {isEditing ? (
              <input
                type="number"
                className="border rounded px-2 py-1 w-full mt-1"
                value={editValues.buyprice ?? ''}
                onChange={(e) => handleInput('buyprice', e.target.value)}
              />
            ) : (
              <div className="font-medium">{item.buyprice.toLocaleString('vi-VN')}</div>
            )}
          </div>
          
          <div>
            <div className="text-sm text-gray-500">Bán ra:</div>
            {isEditing ? (
              <input
                type="number"
                className="border rounded px-2 py-1 w-full mt-1"
                value={editValues.sellprice ?? ''}
                onChange={(e) => handleInput('sellprice', e.target.value)}
              />
            ) : (
              <div className="font-medium">{item.sellprice.toLocaleString('vi-VN')}</div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          {isEditing ? (
            <>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                onClick={() => saveEdit(item)}
              >
                Lưu
              </button>
              <button
                className="bg-gray-400 text-white px-3 py-1 rounded text-sm"
                onClick={cancelEdit}
              >
                Hủy
              </button>
            </>
          ) : (
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
              onClick={() => startEdit(item)}
            >
              Sửa
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      {/* Bảng cho desktop */}
      <div className="hidden md:block">
        <table className="w-full border border-collapse border-gray-400">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-3 py-2">Loại vàng</th>
              <th className="border px-3 py-2">Mua vào</th>
              <th className="border px-3 py-2">Bán ra</th>
              <th className="border px-3 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              const isEditing = editingId === item._id;
              return (
                <tr key={item._id} className="odd:bg-white even:bg-gray-50">
                  <td className="border px-3 py-2">{item.goldtype}</td>
                  <td className="border px-3 py-2">
                    {isEditing ? (
                      <input
                        type="number"
                        className="border rounded px-2 py-1 w-full"
                        value={editValues.buyprice ?? ''}
                        onChange={(e) =>
                          handleInput('buyprice', e.target.value)
                        }
                      />
                    ) : (
                      item.buyprice.toLocaleString('vi-VN')
                    )}
                  </td>
                  <td className="border px-3 py-2">
                    {isEditing ? (
                      <input
                        type="number"
                        className="border rounded px-2 py-1 w-full"
                        value={editValues.sellprice ?? ''}
                        onChange={(e) =>
                          handleInput('sellprice', e.target.value)
                        }
                      />
                    ) : (
                      item.sellprice.toLocaleString('vi-VN')
                    )}
                  </td>
                  <td className="border px-3 py-2 space-x-2">
                    {isEditing ? (
                      <>
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded"
                          onClick={() => saveEdit(item)}
                        >
                          Lưu
                        </button>
                        <button
                          className="bg-gray-400 text-white px-3 py-1 rounded"
                          onClick={cancelEdit}
                        >
                          Hủy
                        </button>
                      </>
                    ) : (
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                        onClick={() => startEdit(item)}
                      >
                        Sửa
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Card layout cho mobile */}
      <div className="md:hidden">
        {data.map(renderMobileCard)}
      </div>
    </div>
  );
}
