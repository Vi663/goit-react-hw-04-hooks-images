import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "react-loader-spinner";
import { fetchImgWithQuery } from '../../services/imagesApi'
import { Searchbar } from "../searchbar/Searchbar";
import { ImageGallery } from "../imageGallery/ImageGallery";
import { ImageGalleryItem } from "../imageGalleryItem/ImageGalleryItem";
import { Button } from "../button/Button";
import { Modal } from "../modal/Modal";
import { Wrapper } from "../wrapper/Wrapper";

const initialState = '';

export function App() {
  
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState(initialState)
  const [status, setStatus] = useState('idle')
  const [isModalOpen, setModal] = useState(false)
  const [imageData, setImageData] = useState(initialState)
  const [images, setImages] = useState([])
  const [error, setError] = useState(null)

  
  
  useEffect(() => {
    if (searchQuery === '') {
      return
    }
    setStatus('pending')
    const fetchImages = async () => {
      try {
        const { hits } = await fetchImgWithQuery(
          searchQuery,
          page,
          status
        )
        if (hits.length === 0) {
          setStatus('rejected')
        } else {
        setImages((prevState) => ([...prevState, ...hits]))
        setPage((prevState) => (prevState + 1))
        setError(null)
        scrollDown()
        setStatus('resolved')
      }
      } catch (err) {
        setError(err.toString())
        setStatus('rejected')
      } finally {
        toggleStatus();
      }
  }
    // setImages([])
    fetchImages()
    // setPage(1)
  }, [page, searchQuery, status])

    

  
  // useEffect(() => {
  //    fetchImages()
  // }, [fetchImages, page])

  // componentDidMount() {
  //   window.addEventListener('keydown', this.onHandleKeydown)
  // }

  // componentWillUnmount() {
  //   window.removeEventListener ('keydown', this.onHandleKeydown)
  // }

  // const onHandleKeydown = (e) => {
  //   if (e.code === 'Escape') {
  //     onToggleModal();
  //   }
  // }
  // const fetchImages = useCallback(
  // )

  const scrollDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  const toggleStatus = () => {

    switch (status) {
      case 'pending':
        toast.loading("Loading...")
        break;

      case 'resolved':
        toast.success("Found!")
        break;
      
      case 'rejected':
        toast.error("Not found!", error)
        break;

      default:
        return;
    }
  }

  const onHandleSubmit = (inputValue) => {
    setSearchQuery(inputValue);
  }


  const onImageClick = (data) => {
    setImageData(data);
    onToggleModal();
  }

  const onToggleModal = (e) => {
    setModal(!isModalOpen);
  }

  const onLoadNext = () => {
    setPage((prevState) => (prevState + 1))
  }

  return (
    <Wrapper>
      <Searchbar onSubmit={onHandleSubmit} />
      {status === 'resolved' &&
        <ImageGallery>
          <ImageGalleryItem
            response={images}
            onSelect={onImageClick} />
        </ImageGallery>}
      {status === 'resolved' && <Button onHandleSubmit={onLoadNext()} />}
      {isModalOpen &&
        <Modal imageURL={imageData} onClose={onToggleModal()} />}
      {status === 'pending' && <Loader
        type="ThreeDots"
        color="#3f51b5"
        height={40}
        width={40}
        timeout={2000}
      />}
      <ToastContainer position="top-right" theme="dark" autoClose='2000' />
    </Wrapper>
  );
}