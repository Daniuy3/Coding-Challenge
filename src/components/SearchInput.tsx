import { Autocomplete, TextField } from "@mui/material"
import { useTableStore } from "../store/tableStore"
import { useEffect, useMemo, useState } from "react";

function SearchInput() {
    const data = useTableStore(state => state.data);
    const filterData = useTableStore(state => state.filterData);
    const options  = useMemo(() => data.map(bank => bank.bankName), [data]);

    const [staticValue, setStaticValue] = useState<string | null>(null);
    const [searchValue, setSearchValue] = useState<string>('');

    useEffect(() => {
      filterData(searchValue);
    },[searchValue, data])

    useEffect(() => {
      setStaticValue(null);
      setSearchValue('');
    }, [data])
    
  return (
    <div>
      <Autocomplete
        freeSolo
        value={staticValue}
        onChange={(_event, newValue) => {
          setStaticValue(newValue);
        }
        }
        inputValue={searchValue}
        onInputChange={(_event, newInputValue) => {
          setSearchValue(newInputValue);
        }}
        options={options.map((option) => option)}
        renderInput={(params) => <TextField {...params} placeholder='Search' className='w-full p-2 border border-gray-300 rounded-md' />}
        sx={{ width: 300 }}
      />
    </div>
  )
}

export default SearchInput