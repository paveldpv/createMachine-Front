import React from 'react'
import { useEffect, useState } from 'react'
//=======import Style=======//
import './DrawingCatalog.css'
//=======import axios=======//
import axios from 'axios'
//=======import Componets=======//
import ImalgeList from '../../component/ImageList/ImageList'
//=======import MUI=======//
import TextField from '@mui/material/TextField'
import FolderIcon from '@mui/icons-material/Folder';
//=======config=======//
import { url } from '../../config/config'
//=======import component=======//
import GoogleIcon from '../../component/additional/GoogleIcon/GoogleIcon';
import FilterTextField from '../../component/FilterTextField/FilterTextField'
//=======import function=======//
import { searchFilter } from '../../function/searchFiltertoNumber'



export default function DrawingCatalog() {

  const [search, setSearch] = useState(``)
  const [data, setData] = useState({
    path: ``,
    files: [],
    isFolder: false
  })
  const [parent, setParent] = useState()


  useEffect(() => { axios.get(`${url}exploer`).then(res => setData(res.data)) }, [])

  const clicHeandler = event => {

    event.preventDefault(); 
    setSearch(``)   
    let path = event.target.attributes.href.value;

    axios.get(`${url}exploer?path=${path}`)
      .then((res) => {
        let linkBack = res.data.path.split("/")
        linkBack.pop()
        setParent(linkBack.join(`/`))
        setData(res.data)
      })

  }  
  

  return (

    <div className='box'>
      <div className='search'>
        {/* строка поиска               */}
        <FilterTextField setSearch={setSearch} titleSearch={`поиск по текущему каталогу`} value={search} />
        
        {/* кнопка назад */}
        {!parent ? `` : <span className='openSB' href={parent} onClick={clicHeandler}>
          <GoogleIcon icon={`undo`} color={`#fedfaa`} />
          назад
        </span>}
      </div>
      <hr />



      {/* блок отрисовки */}
      {data.isCatalog ?
        <ImalgeList data={searchFilter(data.files, search)} path={data.path} />

        :

        <div className={data.files.length > 10 ? "moreTen" : ``}>
          {searchFilter(data.files, search).map(item => {
            return <li key={item.name}>
              <FolderIcon fontSize='large' className='icon' />
              <a href={data.path + `/` + item.name} onClick={clicHeandler}>
                {item.name}
              </a>
            </li>
          })}
        </div>}
    </div>
  )
}
