import React, { Component } from 'react';
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

export class App extends Component {
  
  state = {
    page: 1,
    searchQuery: '',
    status: 'idle',
    isModalOpen: false,
    imageData: '',
    images: [],
    error: null,
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({ status: 'pending', images: [] });
      this.fetchImages();
      this.setState({ page: 1 })
      return
    }
    // if (prevState.page !== this.state.page) {
    //   this.fetchImages();
    //   return
    // }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onHandleKeydown)
  }

  componentWillUnmount() {
    window.removeEventListener ('keydown', this.onHandleKeydown)
  }

  onHandleKeydown = (e) => {
    if (e.code === 'Escape' ) {
      this.onToggleModal();
    }
  }
    fetchImages = async () => {
    const { searchQuery, page, status } = this.state;

    this.setState({ status: 'pending' });

    try {
      const { hits } = await fetchImgWithQuery(
        searchQuery,
        page,
        status
      );
      if (hits.length === 0) {
        this.setState({ status: 'rejected' })
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          page: prevState.page + 1,
          error: null,
          status: 'resolved'
        }))
      }
    } catch (err) {
      this.setState({ error: err.toString(), status: 'rejected' });
    } finally {
      this.setStatus();
      this.scrollDown();
    }
  };

  scrollDown() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  setStatus = () => {
    const { status } = this.state;

    switch (status) {
      case 'pending':
        toast.loading("Loading...")
        break;

      case 'resolved':
        toast.success("Found!")
        break;
      
      case 'rejected':
        toast.error("Not found!")
        break;

      default:
        return;
    }
  }

  onHandleSubmit = (inputValue) => {
    this.setState({ searchQuery: inputValue });
  }


  onImageClick = (data) => {
    this.setState({ imageData: data });
    this.onToggleModal();
  }

  onToggleModal = (e) => {
    this.setState(({isModalOpen}) => ({ isModalOpen: !isModalOpen }));
  }

  onLoadNext = () => {
    this.fetchImages();
  }

  render() {
    const {status, images, isModalOpen, imageData} = this.state;
    return (
      <Wrapper>
        <Searchbar onSubmit={this.onHandleSubmit} />
        {status === 'resolved' &&
          <ImageGallery>
          <ImageGalleryItem
            response={images}
            onSelect={this.onImageClick} />
          </ImageGallery>}
        {status === 'resolved' && <Button onHandleSubmit={this.onLoadNext}/>}
        { isModalOpen &&
          <Modal imageURL={imageData} onClose={this.onToggleModal} />}
        {status === 'pending' && <Loader
          type="ThreeDots"
          color="#3f51b5"
          height={40}
          width={40}
          timeout={2000}
        />}
      <ToastContainer position="top-right" theme="dark" autoClose='2000'/>
      </Wrapper>
    );
  }
}