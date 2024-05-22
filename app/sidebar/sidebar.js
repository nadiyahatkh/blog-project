export default function SideBar({category, onFilter}){
    return(
        <div className="sidebar">
      <h6 className="border-b border-gray-200">Produk</h6>
      <p>Category</p>
      <div className="flex flex-col space-y-1">
        <button onClick={() => onFilter('all')}>Semua</button>
        {category?.map((category) => (
          <button key={category.id} onClick={() => onFilter(category.id)}>
            {category.name}
          </button>
        ))}
      </div>
    </div>
    )
}