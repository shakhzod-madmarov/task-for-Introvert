const BtnFetch = ({ fetchData }) => {
  const handleFetchData = () => {
    fetchData();
  };

  return (
    <button onClick={handleFetchData} type="submit">
      Создание задач для контактов без сделок
    </button>
  );
};

export default BtnFetch;
