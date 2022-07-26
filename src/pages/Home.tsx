import React, { useEffect, useRef, useState } from "react";
import Modal from "../components/Modal.jsx/index";
import PizzaBlock from "../components/PizzaBlock";
import Sort, { list } from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import { useSelector, useDispatch } from "react-redux/es/exports";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filter/slice";
import { selectFilter } from "../redux/slices/filter/selectors";
import { fetchPizzas } from "../redux/slices/pizza/slice";
import { PizzaItemsType } from "../redux/slices/pizza/types";
import { selectPizzaData } from "../redux/slices/pizza/selectors";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, isLoading } = useSelector(selectPizzaData);
  const sortType = sort.sort;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClickCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const order = sortType.includes("-") ? "asc" : "desc";
    const sortBy = sortType.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage,
      })
    );

    window.scrollTo(0, 0);
  };

  // If params were changed and first render already was
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  // If there was first render then check URL params and save in redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sort === params.sort);
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  // If there was first render then fetch pizzas
  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((item: PizzaItemsType) => (
    <PizzaBlock
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      key={item.id}
      {...item}
    />
  ));

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Menu</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
