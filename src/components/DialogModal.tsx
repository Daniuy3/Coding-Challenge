import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { useTableStore } from '../store/tableStore';


function DialogModal() {
    const modalOpen = useTableStore(state => state.modalOpen);
    const setModalOpen = useTableStore(state => state.setModalOpen);
    const deleteBank = useTableStore(state => state.deleteBank);
    const deleteId = useTableStore(state => state.deleteId);

    function handleDelete() {
        deleteBank(deleteId);
        setModalOpen(false);
    }

  return (
    
    <Dialog 
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogContent>
            Delete a field could result in data loss
          </DialogContent>
          <DialogActions>
            <button onClick={handleDelete} className='text-red-500 flex gap-2 items-center'>
              <img src="/delete.svg" alt="delete" className='w-4 h-4' />
              Delete
            </button>
            <button onClick={() => setModalOpen(false)}>Cancel</button>
          </DialogActions>
      </Dialog>
  )
}

export default DialogModal