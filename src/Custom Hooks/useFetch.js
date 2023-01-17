import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
        .then((res) => {
          if (!res.ok) {
            throw Error("Could not fetch data");
            // eslint-disable-next-line no-unreachable
          }
          return res.json();
        })
        .then((data) => {
          //   console.log(data);
          setError(null);
          setData(data);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            setError(err.message);
          }
        });

      return () => {
        abortCont.abort();
      };
    }, 1000);
  }, [url]);

  return { data, error };
};

export default useFetch;
