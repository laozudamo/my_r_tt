import { Pagination } from 'antd'

export default function PageNav({page,count,defaultPageSize, pageChange, setPageSize }) {
  return (
    <Pagination
      onChange={pageChange}
      defaultCurrent={1}
      defaultPageSize={defaultPageSize}
      current={page}
      showSizeChanger={true}
      onShowSizeChange={(cur, size) => setPageSize(size)}
      total={count}
    />
  )
}
