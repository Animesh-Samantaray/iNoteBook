import React, { useState } from 'react';
import NoteContext from './NoteContext.jsx';

const NoteState = (props) => {

   const initialNotes =[
  {
    _id: "689d53daef1fa7290ba4801d",
    user: "689d52c85136573e6e4fdb7a",
    title: "Animesh the hero",
    description: "He is very good boy not knowing anything",
    tag: "Violance",
    date: "2025-08-14T03:11:22.069Z",
    __v: 0
  },
  {
    _id: "689d5778ef1fa7290ba48023",
    user: "689d5744ef1fa7290ba48021",
    title: "++++++++++++++++++++++++++++++++++",
    description: "zz xx cc vv bb nn mm kk jj ",
    tag: "***********************************",
    date: "2025-08-14T03:26:48.117Z",
    __v: 0
  },
  {
    _id: "689d64ad559d1230080afb36",
    user: "689d5744ef1fa7290ba48021",
    title: "11111111111111111222222222222223333333333",
    description: "-------+s xbjhbjdbvhx___ ",
    tag: "qskxjnjhbjhcbc jhsws gjxjx",
    date: "2025-08-14T04:23:09.880Z",
    __v: 0
  },
  {
    _id: "689d6d31fbe54852f4ddecfe",
    user: "689d5744ef1fa7290ba48021",
    title: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaas",
    description: "-------+s ssssssssssssssssssssssssssssssssss ",
    tag: "ssssssssssssssssssssssssssssssssssssssssssssss",
    date: "2025-08-14T04:59:29.820Z",
    __v: 0
  },
  {
    _id: "689d951110c67e983271b917",
    user: "689d941110c67e983271b915",
    title: ".....",
    description: "-------..... ",
    tag: "......",
    date: "2025-08-14T07:49:37.972Z",
    __v: 0
  }
]


  const [note,setNote] = useState(initialNotes);
    return (
        <NoteContext.Provider value={{note,setNote}}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
