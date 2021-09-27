import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "react-loader-spinner";
import { fetchImgWithQuery } from '../../services/imagesApi'
import { Searchbar } from "../Searchbar/Searchbar";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { ImageGalleryItem } from "../ImageGallery/ImageGalleryItem/ImageGalleryItem";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import { Wrapper } from "../Wrapper/Wrapper";

export function App() {
  
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [status, setStatus] = useState('idle')
  const [isModalOpen, setModal] = useState(false)
  const [imageData, setImageData] = useState(null)
  const [images, setImages] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    if (searchQuery === '') {
      return
    } else if (page === 1) {
      setImages('')
    }
    const fetchImages = async () => {
      try {
        const { hits } = await fetchImgWithQuery(
          searchQuery,
          page
        );
        if (hits.length === 0) {
          setStatus('rejected')
          toast.error('Not found!')
        } else {
        setImages((prevState) => ([...prevState, ...hits]))
        setError(null)
        setStatus('resolved')
        toast.success('Found!')
        // scrollDown()
      }
      } catch (err) {
        setError(err.toString())
        setStatus('rejected')
        toast.error('Not found!')
      }
    }
    fetchImages()
  }, [page, searchQuery])

  useEffect(() => {
  window.addEventListener('keydown', onHandleKeydown)
  return function cleanup() {
    window.removeEventListener('keydown', onHandleKeydown)
  }
}, [isModalOpen])
  
  function onToggleModal() {
    setModal(!isModalOpen);
  }

  function onHandleKeydown(e) {
    if (e.code === 'Escape') {
      onToggleModal()
    }
  }

  const scrollDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  const onHandleSubmit = (inputValue) => {
    setPage(1)
    setSearchQuery(inputValue)
  }


  const onImageClick = (data) => {
    setImageData(data);
    onToggleModal();
  }

  const onLoadNext = () => {
    setPage((prevState) => (prevState + 1))
  }

  return (
    <Wrapper>
      <Searchbar onSubmit={onHandleSubmit} />
      {images.length > 0 &&
        <ImageGallery>
          <ImageGalleryItem
            response={images}
            onSelect={onImageClick} />
        </ImageGallery>}
      {images.length > 0 && <Button onHandleSubmit={onLoadNext} />}
      {isModalOpen &&
        <Modal imageURL={imageData} onClose={onToggleModal} />}
      {status === 'pending' && <Loader
        type='ThreeDots'
        color='#3f51b5'
        height={40}
        width={40}
        timeout={2000}
      />}
      <ToastContainer position='top-right' theme='dark' autoClose='2000' />
    </Wrapper>
  );
}