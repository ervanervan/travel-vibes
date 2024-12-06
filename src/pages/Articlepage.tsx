// import { useEffect, useState } from "react";
// import { getArticles } from "../services/articlesApi";

const Articlepage = () => {
  return <div>Article page</div>;
  // const [articles, setArticles] = useState([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await getArticles({
  //         "pagination[page]": 1,
  //         "pagination[pageSize]": 10,
  //         populate: "*",
  //       });
  //       setArticles(response.data.data); // Sesuaikan dengan struktur API.
  //     } catch (error) {
  //       console.error("Error fetching articles:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);
  // if (loading) return <p>Loading articles...</p>;
  // return (
  //   <div>
  //     <h1>Articles</h1>
  //     <ul>
  //       {articles.map((article: any) => (
  //         <li key={article.id}>
  //           <h2>{article.attributes.title}</h2>
  //           <p>{article.attributes.description}</p>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
};

export default Articlepage;
