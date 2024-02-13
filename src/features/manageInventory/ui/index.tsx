import React, { useRef, useState } from 'react'
import styles from './styles.module.scss'
import IconButton from 'shared/ui/iconButton';
import { CiSettings } from "react-icons/ci";
import { IoMdMore } from "react-icons/io";
import { Tovar, TovarFormData } from 'entities/Tovar/Tovar';
import a from 'public/folder-3.png'
import asset1 from 'public/asset1.png'
import noImg from 'public/no_image_available.jpg'
import asset2 from 'public/asset2.jpeg'
import Overlay from 'shared/ui/overlay';
import InventoryItem from '../inventoryItem';
import { useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import { GrCheckboxSelected } from "react-icons/gr";
import { CiCirclePlus } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';

import RippleContainer from 'shared/ui/rippleEffectContainer';
import { RootState } from 'store/store';
import CreateItemSidebar from '../createItem/ui';
import Tab from '../components/tab';
import InventorySearch from '../components/searchInput';
// import { addCategory, setCurrentCategory, setTovarSearchText } from 'entities/Tovar/tovarSlice';
import { addCategories, addTovar, setCurrentCategory, setTovarSearchText, setFormDataCategory, setTovarFormData, addCategory, setActiveProduct, setCurrentPage } from 'entities/Tovar/categorySlice'
import InventoryItemMenu from '../components/inventoryMenu';
import { SettingsMenu } from '../utils/consts';
import Checkbox from 'shared/ui/checkbox';
import Input from 'shared/ui/input';
import { getProducts, uploadNewCategory } from 'entities/Establishment/api';
import Loader from 'shared/ui/loader';
import { useAlertContext } from 'hooks/AlertProvider';
import ContextMenu from '../inventoryItem/ContextMenu';
import Pagination from 'widgets/pagination';


interface ManageInventoryProps {
    onClose: () => void
}

const ManageInventory: React.FC<ManageInventoryProps> = (
    { onClose }
) => {
    const dispatch = useAppDispatch()
    const [isCreateItemSidebarShown, setIsCreateItemSidebarShown] = useState(false)
    const onCloseSidebar = () => { setIsCreateItemSidebarShown(false) }
    const onOpenSidebar = () => { setIsCreateItemSidebarShown(true) }

    const est = useAppSelector((state: RootState) => state.establishment.establishment)
    const categoryList = useAppSelector((state: RootState) => state.categories.categories)
    const searchText = useAppSelector((state: RootState) => state.categories.searchText)
    const currentCategoryId = useAppSelector((state: RootState) => state.categories.currentCategoryId)
    const isLoading = useAppSelector((state: RootState) => state.categories.isLoading)
    const currentCategory = useAppSelector((state: RootState) => state.categories.currentCategory)
    const activeProduct = useAppSelector((state: RootState) => state.categories.activeProduct)
    const products = useAppSelector((state: RootState) => state.categories.products)
    const totalProducts = useAppSelector((state: RootState) => state.categories.productsAmount)
    const currentPage = useAppSelector((state: RootState) => state.categories.currentPage)
    const onSearchTextType = (value: string) => {
        dispatch(setTovarSearchText(value))
    }


    // {
    //     title: "Select",
    //     icon: <GrCheckboxSelected color='blue'></GrCheckboxSelected>,
    //     onClick: () => { }
    // }

    const [menuVisible, setMenuVisible] = useState(false);
    const closeMenu = () => {
        setMenuVisible(false)
    }
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const inventoryItemRef = useRef<HTMLDivElement>(null);

    const toggleContextMenu = (event: MouseEvent, item: Tovar) => {
        event.preventDefault();
        const menuX = event.clientX;
        const menuY = event.clientY;
        setMenuPosition({ x: menuX, y: menuY });
        setMenuVisible(!menuVisible);
        dispatch(setActiveProduct(item))
    };

    const [showSettingsMenu, setShowSettingsMenu] = useState<boolean>(false)
    const [settingsMenuPosition, setSettingsMenuPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 })

    const settingMenuRef = useRef<HTMLDivElement>(null)
    const toggleSettingsMenu = (e: React.MouseEvent) => {
        let x = e.clientX
        let y = e.clientY
        setShowSettingsMenu(!showSettingsMenu)
        if (settingMenuRef.current) {
            let settingsRect = settingMenuRef.current.getBoundingClientRect()
            setSettingsMenuPosition({ x: x - settingsRect.left, y: y - settingsRect.top })
            return
        }
        setSettingsMenuPosition({ x: e.clientX - 180, y: e.clientY + 20 })
    }
    const [creatingTab, setCreatingTab] = useState(false)
    const [newTab, setNewTab] = useState('')
    const { showAlert } = useAlertContext()
    const createCategory = async (newTab: string) => {
        try {
            if (categoryList.findIndex((item) => item.name == newTab) !== -1) {
                showAlert('error', 'that category already exists')
                return
            }
            const result = await dispatch(uploadNewCategory({ id: 1 || undefined, name: newTab }))
            dispatch(addCategory({ id: est?.id || 0, name: newTab, products: [] }))
        } catch (e) {
        }
        // dispatch(addCategory(newTab))
    }
    const closeCreateCategory = () => {
        setNewTab('')
        setCreatingTab(false)
    }
    console.log(categoryList);
    useEffect(() => {
        console.log('asdasd');
        
        dispatch(getProducts({ id: currentCategoryId || 0, page: currentPage, limit: 12 }))
    }, [dispatch, currentCategoryId,currentPage])



    const onPaginate = async (page: number) => {
        dispatch(setCurrentPage(page))
        // await dispatch(getProducts({ id: currentCategoryId || 0, page: page, limit: 12 }))
    }
    const onNextPaginate = async (page: number) => {
        dispatch(setCurrentPage(page))
        // await dispatch(getProducts({ id: currentCategoryId || 0, page: page, limit: 12 }))
    }
    const onPrevPaginate = async (page: number) => {
        dispatch(setCurrentPage(page))
        // await dispatch(getProducts({ id: currentCategoryId || 0, page: page, limit: 12 }))
    }
    const onItemClick = (item:Tovar) =>{
        const newTovarFormData:TovarFormData ={
            img:item.img,
            discount:item.discount,
            description:item.description,
            name:item.name,
            category:item.category?.id || 0,
            price:item.price
        }
        dispatch(setTovarFormData(newTovarFormData))
        onOpenSidebar()
    }
    return (
        <Overlay onClose={onClose}>
            <div className={styles.container}>
                <CreateItemSidebar isShown={isCreateItemSidebarShown} onClose={onCloseSidebar}></CreateItemSidebar>
                <div className={styles.header}>
                    <div className={styles.titleContainer}>
                        <h3>Inventory</h3>
                        <div className={styles.tabContainer}>
                            {categoryList.length == 0 ? <span style={{ color: "red" }}>
                                No categories
                            </span>
                                :
                                categoryList.map((tab, index) => {
                                    return <Tab key={index} selectedTab={currentCategoryId || null} tab={tab} onClick={() => { dispatch(setCurrentCategory(tab)) }}></Tab>
                                })
                            }
                        </div>
                        {creatingTab ?
                            <form action="" onSubmit={(e) => {
                                e.preventDefault()
                                createCategory(newTab)
                                closeCreateCategory()
                                setCreatingTab(false)
                            }}>
                                <Input
                                    onBlur={closeCreateCategory}
                                    name='tab'
                                    value={newTab}
                                    onChange={(e) => { setNewTab(e.target.value) }}
                                    placeholder='newTab'
                                    type="text"
                                    className={styles.tabInput}></Input>
                            </form>
                            : <IconButton onClick={() => setCreatingTab(true)}>
                                <CiCirclePlus size={'30px'}></CiCirclePlus>
                            </IconButton>
                        }
                    </div>
                    <div className={styles.actionsContainer}>
                        <InventorySearch
                            value={searchText}
                            onTextType={onSearchTextType}
                        ></InventorySearch>
                        <RippleContainer className={styles.addBtn} onClick={onOpenSidebar}>
                            {/* <span>Add tovar</span> */}
                            <CiCirclePlus size={'30px'}></CiCirclePlus>
                        </RippleContainer>
                        <IconButton onClick={toggleSettingsMenu}>
                            <CiSettings size={'1.5rem'} color='#757575'></CiSettings>
                        </IconButton>
                        <IconButton>
                            <IoIosClose size={'2rem'} color='red'></IoIosClose>
                        </IconButton>
                    </div>
                </div>
                <div className={styles.inventory}>
                    <div className={styles.paginationContainer}>
                        <Pagination currentPage={currentPage} totalItems={totalProducts} itemsPerPage={12} onChangePage={onPaginate} onNextPageClick={onNextPaginate} onPrevPageClick={onPrevPaginate}></Pagination>
                    </div>
                    <div className={styles.itemList}>
                        {showSettingsMenu && (
                            <InventoryItemMenu data={SettingsMenu} x={settingsMenuPosition.x} y={settingsMenuPosition.y}></InventoryItemMenu>
                        )}
                        {menuVisible && activeProduct && <ContextMenu closeMenu={closeMenu} menuPosition={menuPosition} product={activeProduct}></ContextMenu>}

                        {isLoading == true ?
                            <Loader></Loader>
                            : <>
                                {
                                    products.map((item, ind) => (
                                        item.name.includes(searchText) &&
                                        (
                                            <InventoryItem
                                                onClick={onItemClick}
                                                item={item}
                                                onActionBtnClick={toggleContextMenu}
                                                key={ind}
                                            />
                                        )
                                    ))
                                }
                            </>



                        }
                    </div>
                </div>
            </div>
        </Overlay>
    )
}

export default ManageInventory