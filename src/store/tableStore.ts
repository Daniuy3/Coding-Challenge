import {create} from "zustand";
import { BankResponse, Bank } from "../types";
import { devtools } from 'zustand/middleware';
import { timeEdition } from "../helpers";
import { toast } from "react-toastify";

const initialData : BankResponse[] = [
    {
        "description": "Banco Paga Todo es Para Todos",
        "age": 10,
        "url": "https://firebasestorage.googleapis.com/v0/b/stagingpagatodo-286214.appspot.com/o/Challenge%2Flogo-pagatodo.jpeg?alt=media&token=38b6ac4d-85ac-4288-bada-88eb5a0dec20",
        "bankName": "Paga Todo"
    },
    {
        "description": "BBVA Bancomer Creando Oportunidades",
        "bankName": "BBVA Bancomer",
        "age": 11,
        "url": "https://firebasestorage.googleapis.com/v0/b/stagingpagatodo-286214.appspot.com/o/Challenge%2Flogo-bbva.jpeg?alt=media&token=435ed70e-061b-4a80-a216-c69cea04f068"
    },
    {
        "description": "Scotiabank Creando Tú decides, Nosotros te Asesoramos",
        "bankName": "Scotiabank México",
        "age": 9,
        "url": "https://firebasestorage.googleapis.com/v0/b/stagingpagatodo-286214.appspot.com/o/Challenge%2Flogo.scotiabank.jpg?alt=media&token=1029cc0b-7bff-4f5c-90f7-d96ca60f9619"
    },
    {
        "description": "Citibanamex, lo mejor de México, lo mejor del mundo.",
        "bankName": "Citibanamex",
        "age": 7,
        "url": "https://firebasestorage.googleapis.com/v0/b/stagingpagatodo-286214.appspot.com/o/Challenge%2Flogo-citi.png?alt=media&token=da97f3ad-34b2-4f7d-ae59-3169238993c7"
    },
    {
        "description": "Banregio: Somos el banco de creadores",
        "bankName": "Banregio",
        "age": 5,
        "url": "https://firebasestorage.googleapis.com/v0/b/stagingpagatodo-286214.appspot.com/o/Challenge%2Flogo-banregio.png?alt=media&token=ae605bda-5698-4bf8-9639-d4fdc9579b5c"
    }
]

type tableStoreProps = {
    data: Bank[] ;
    editingData: Bank;
    filteredData: Bank[];
    modalOpen: boolean;
    deleteId: Bank["id"];
    setData: (data: Bank[]) => void;
    setEditingData: (data: Bank) => void;
    deleteBank: (id: Bank["id"]) => void;
    sortData: (sortType: "age" | "id") => void;
    filterData: (searchValue: Bank["bankName"]) => void;
    resetApp: () => void;
    setModalOpen: (status: boolean) => void;
    setDeleteId: (id: Bank["id"]) => void;
    setToast: (message: string, kind: "info" | "error" | "success") => void;
}

const fetchBanks = () => {
    const idData = initialData.map((bank, index) => ({...bank, id: index, date: timeEdition()}));
    return idData;
}


export const useTableStore = create<tableStoreProps>()(devtools((set) => ({
    data: fetchBanks(),
    editingData: {} as Bank,
    filteredData: [] as Bank[],
    modalOpen: false,
    deleteId: 0 as Bank["id"],
    setData: (data) => set({filteredData: data}),
    setEditingData: (data: Bank) => set(() => ({editingData: data})),
    deleteBank: (id: Bank["id"]) => set((state) => (
        state.setToast("Data deleted", "error"),
        {
            data: state.data.filter(bank => bank.id !== id)
        })),
    sortData: (sortType : "age" | "id") => set((state) => {
        const sortedData = [...state.filteredData].sort((a, b) => {
            if (sortType === 'age') {
                return a.age - b.age;
            } else {
                return a.id - b.id;
            }
        });
        return {filteredData: sortedData};
    }),
    filterData: (searchValue: string) => set((state) => (
      {filteredData: state.data.filter(bank => bank.bankName.toLowerCase().includes(searchValue.toLowerCase()))} 
    )),
    resetApp: () => set((state) => (
        state.setToast("Data reset", "info"),
        {data: fetchBanks()})),
    setModalOpen: (status: boolean) => set(() => ({modalOpen: status})),
    setDeleteId: (id: Bank["id"]) => set(() => ({deleteId: id})),
    setToast: (mesagge: string, kind: "info" | "error" | "success") => {
        toast(mesagge, {type: kind, autoClose: 2000});
    }
})));
