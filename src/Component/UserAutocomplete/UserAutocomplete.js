import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import {API_USER} from "../../constant";
import {setSnackbar} from "../../controller/site";
import {useDispatch} from "react-redux";
import matchSorter from "match-sorter";

export default function UserAutocomplete(props) {
    const {label, id, defaultValue, disabled} = props;
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [userList, setUserList] = React.useState([]);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (open && !loading && userList.length === 0) {
            setLoading(true);
            axios.get(API_USER, {
                withCredentials: true,
                validateStatus: status => status === 200
            })
                .then(res => res.data)
                .then(res => {
                        typeof res.users === "object" && setUserList(res.users);
                    }
                ).catch(err => {
                dispatch(setSnackbar("拉取用户列表失败，请重试", "error"));
            }).finally(() => setLoading(false));
        }
    }, [open]);

    return (
        <Autocomplete open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}
                      loading={loading} loadingText="加载中..." noOptionsText="没有这个人" options={userList}
                      id={id} defaultValue={defaultValue} disabled={disabled}
                      getOptionLabel={(option) => option.uid}
                      renderOption={(option) => option.nickname + "@" + option.uid}
                      getOptionSelected={(option, value) => option.uid === value.uid}
                      filterOptions={(options, { inputValue }) =>
                          matchSorter(options, inputValue, {keys: ["nickname", "uid"]})}
                      renderInput={(params) => (
                          <TextField
                              {...params}
                              label={label}
                              InputProps={{
                                  ...params.InputProps,
                                  endAdornment: (
                                      <React.Fragment>
                                          {loading ? <CircularProgress size={20}/> : null}
                                          {params.InputProps.endAdornment}
                                      </React.Fragment>
                                  ),
                              }}
                          />
                      )}/>
    );
}