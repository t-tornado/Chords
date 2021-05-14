import React, {useContext, createContext} from 'react';
import {connect} from 'react-redux';
import {openDelete} from '../Redux/Actions/DeleteActions';
import {getFileToDelete} from '../Redux/Selector/MainSelector';

const CardOptionStateContext = createContext();
const ToggleCardOptionState = createContext();
const DownloadedSongOptionContext = createContext();
const SetSongToDeleteContext = createContext();

const OpenCardOptionsContext = props => {
  const [openState, setOpenState] = React.useState(false);

  const toggleOptions = {
    open: () => setOpenState(true),
    close: () => setOpenState(false),
  };


  return (
    <>
<CardOptionStateContext.Provider value={openState}>
<ToggleCardOptionState.Provider value={toggleOptions}>
<DownloadedSongOptionContext.Provider value={props.downloadedSongOption}>
<SetSongToDeleteContext.Provider value={props.setSongToDeleteAction}>
            {props.children}
</SetSongToDeleteContext.Provider>
</DownloadedSongOptionContext.Provider>
</ToggleCardOptionState.Provider>
</CardOptionStateContext.Provider>
    </>
  );
};

export const useCardOptionState = () => {
  const state = useContext(CardOptionStateContext);
  return state;
};

export const useToggleCardOptions = () => {
  const _func = useContext(ToggleCardOptionState);
  return _func;
};

export const useSongToDelete = () => {
  const songOption = useContext(DownloadedSongOptionContext);
  return songOption;
};

export const useSetSongToDelete = () => {
  const setFunction = useContext(SetSongToDeleteContext);
  const _function = React.useCallback((id,title,artist,artwork,composer,duration,genre,likes) => {
    setFunction(
        id,
        title,
      artist,
      artwork,
      composer,
      duration,
      genre,
      likes,
    );
  });
  return _function;
};

const mapState = state => {
  return {
    downloadedSongOption: getFileToDelete(state.player),
  };
};

const mapDispatch = dispatch => {
  return {
    setSongToDeleteAction: (
        id,
      title,
      artist,
      artwork,
      composer,
      duration,
      genre,
      likes,
        ) =>
      dispatch(
        openDelete(
            id,
          title,
          artist,
          artwork,
          composer,
          duration,
          genre,
          likes,
            ),
      ),
  };
};

export default connect(mapState, mapDispatch)(OpenCardOptionsContext);
