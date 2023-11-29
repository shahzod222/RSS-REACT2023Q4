import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPage, setMainPageLoading } from '../store';
import { useRouter } from 'next/router';
import { api } from '../api';

const IndexPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setMainPageLoading(true));

    const fetchData = async () => {
      const { data } = await api.useGetDataQuery({
        pageNumber: 1,
        itemsPerPage: 10,
        search: 'nature',
      });

      if (data) {
        dispatch(setPage(1));
        dispatch(setMainPageLoading(false));
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    router.replace('/page/1');
  }, [router]);

  return null;
};

export default IndexPage;
