import { Button, Box, Spinner } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: string;
  id: string;
}

type FetchImageProps = {
  data: Card[];
  after: string | null;
}

export default function Home(): JSX.Element {
  async function fetchImages({ pageParam = null }){
      const { data } = await api.get(`/api/images`, {
        params: {
          after: pageParam
        }
      })
      return data;
  }
  
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images', fetchImages, {
      getNextPageParam:(lastPage, Allpages) => lastPage?.after || null
    }
  );

  const formattedData = useMemo(() => {
    if(data !== undefined){
      const formatted = data?.pages.flatMap(imageData => {
        return imageData.data.flat()
      })
      return formatted;
    }
  }, [data]);

  if(isLoading){
    return(
      <Loading />
    )
  }

  if(isError){
    return(
      <Error />
    )
  }
  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button 
          mt={4}
          onClick={() => fetchNextPage()} >
            {isFetchingNextPage ? (
              <>
                <p>Carregando  </p>
                <Spinner 
                  ml={4}
                />
              </>
              ) : 'Carregar mais'}
            
          </Button>
        )}
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
      </Box>
    </>
  );
}
