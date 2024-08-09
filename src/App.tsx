import { useMemo, useState } from 'react';
import { useTableStore } from './store/tableStore';
import { Bank } from './types';
import { timeEdition } from './helpers';
import SearchInput from './components/SearchInput';
import ResetButton from './components/ResetButton';
import DialogModal from './components/DialogModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const data = useTableStore(state => state.data);
  const setEditingData = useTableStore(state => state.setEditingData);
  const editingData = useTableStore(state => state.editingData);
  const setdata = useTableStore(state => state.setData);

  const sortData = useTableStore(state => state.sortData);
  const filteredData = useTableStore(state => state.filteredData);

  const setModalOpen = useTableStore(state => state.setModalOpen);
  const [editing, setEditing] = useState(false);

  const setDeleteId = useTableStore(state => state.setDeleteId);

  const ableToReset = useMemo(() => data.length < 5, [data]);

  const setToast = useTableStore(state => state.setToast);

  const handleEdit = (data: Bank) => {
    setEditingData(data);
    setEditing(true);
  }


  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const isNumber = e.target.name === 'age';

    setEditingData({...editingData, [e.target.name]: isNumber ? +e.target.value : e.target.value, date: timeEdition()});
  }

  function handleConfirm() {
    setEditing(false);
    setdata(data.map(bank => bank.id === editingData.id ? editingData : bank));
    setEditingData({} as Bank);
    setToast('Data updated', 'info');
  }

  function handleDelete(id : Bank["id"]) {
    setModalOpen(true);
    setDeleteId(id);
  }

  return (
    <div className='w-11/12 mx-auto pt-10 space-y-10'>
      <h1 className='text-4xl font-bold text-center text-purple-700'>Coding Challenge</h1>
      
      <div className='w-10/12 mx-auto flex flex-col md:flex-row md:justify-between gap-5 items-center'>
          <SearchInput />
          {ableToReset && <ResetButton />}
            
      </div>

      <div className='w-11/12 overflow-hidden overflow-x-scroll lg:overflow-auto lg:overflow-x-auto'>
      <table className='mx-auto table-auto border-spacing-5  border-separate w-[1250px]  lg:w-11/12'>
        <thead>
          <tr>

            <th className='pb-4 border-b flex items-center justify-center gap-3 border-violet-400'>
              <span >ID</span> 
              <button
                onClick={() => sortData('id')}
              >
                <img src="/sort.svg" alt="sort" className='w-4 h-4'/> 
              </button> 
            </th> 

            <th className='pb-4 border-b border-violet-400'>URL</th>
            <th className='pb-4 border-b border-violet-400 w-36'>Bank Name</th>
            <th className='pb-4 border-b border-violet-400 w-[410px]'>Description</th>

            <th className='pb-4 border-b flex items-center gap-3 border-violet-400 justify-center w-20'>
              <span>Age</span>
            <button
              onClick={() => sortData('age')}
            >
                <img src="/sort.svg" alt="sort" className='w-4 h-4'/> 
              </button> 
            </th>
            <th className='pb-4 border-b border-violet-400'>Actions</th>
            <th className='pb-4 border-b border-violet-400'>Updated</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((bank) => (
            <tr key={bank.id} >
              <td className='px-4 pt-7 grid place-content-center'>{bank.id + 1}</td>
              <td className='h-20 w-20 rounded-md overflow-hidden'><img src={bank.url} alt={bank.bankName} className='h-full object-cover' /></td>
              <td className='px-4 w-40'>
                {editing && editingData.id === bank.id ? (
                  <input type="text" name='bankName' value={editingData.bankName} onChange={handleChange} className='border border-purple-400 rounded-md w-full pl-1'/>
                ) : (
                  <p className='pl-1 font-semibold'>{bank.bankName}</p>
                )}
              </td>
              <td className=' px-3 w-[410px]'>
                {editing && editingData.id === bank.id ? (
                  <input type="text" name='description' value={editingData.description} onChange={handleChange} className='border border-purple-400 rounded-md w-full pl-1'/>
                ) : (
                  <p className='w-[410px] pl-1'>{bank.description}</p>
                )}
              </td>
              <td className='px-4 w-10'>
                {editing && editingData.id === bank.id ? (
                  <input type="number" name='age' value={editingData.age} onChange={handleChange} className='border border-purple-400 rounded-md p-1 w-full'/>
                ) : (
                  <p className='py-1 px-2 w-full'>{bank.age}</p>
                )}
              </td>
              <td className=''>
                <div className='flex gap-5 justify-center'>
                <button className='w-6 h-6 relative hover:scale-110 transform transition-transform duration-150'>
                  <img 
                    src="/edit.svg" alt="edit" 
                    className={`absolute inset-0 transition-transform duration-300 ${!editing || editingData.id !== bank.id? "scale-100" : "scale-0 "}`} 
                    onClick={() => handleEdit(bank)}
                  />
                  <img 
                    src="/confirm.svg" alt="confirm"  
                    className={`absolute inset-0 transition-transform duration-300 ${editing && editingData.id === bank.id? "scale-100" : "scale-0 "}`}
                    onClick={handleConfirm}
                  />
                    
                </button>
                <button
                  onClick={() => handleDelete(bank.id)}
                  className='hover:scale-110 transform transition-transform duration-150'
                >
                  <img src="/delete.svg" alt="delete" className='w-6 h-6'/>
                </button>
                </div>
              </td>
              <td>
                <span>{bank.date}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <DialogModal/>

      <ToastContainer />
    </div>
  )
}

export default App



