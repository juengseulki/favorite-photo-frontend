import { useEffect, useRef } from "react";

//---Intersection Observer를 이용한 무한 스크롤을 구현하기 위한 커스텀 훅---
export const useIntersectionObserver = ({ onIntersect, hasNextPage, isLoading, isMobile }) => {
  //bottomRef라는 JS 객체를 하나 만들기 (객체 모양 : { current:null })
  //태그의 ref에 bottomRef를 넣어주면, 이제 current값에 그 실제 DOM 노드가 들어감.
  const bottomRef = useRef(null);

  //컴포넌트가 그려진 이후에 observer에 등록이 가능하므로, useEffect안에 등록 코드를 넣어둔다.
  //또한 한 번 만들어진 이후에 계속 재 생성되지 않도록 하기 위함도 있음.
  useEffect(() => {
    if (!bottomRef.current || !hasNextPage || isLoading || !isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        //entry가 화면에 나타났다면 (교차되었다면)
        if (entry.isIntersecting) {
          onIntersect(); //다음 데이터들을 불러옴.
        }
      },
      { threshold: 0.1 }, //entry가 화면에 다 보였을 때, 실행하라는 뜻.
    );
    observer.observe(bottomRef.current); //관찰 등록
    return () => observer.disconnect(); //클린업 함수 : 컴포넌트가 화면에서 사라질 때, 다음 useEffect가 실행되기 전에 실행됨.
  }, [onIntersect, hasNextPage, isLoading, isMobile]);

  return bottomRef;
};
