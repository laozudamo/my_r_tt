import './BtnBox.scss'
import { Button } from 'antd'
import PropTypes from 'prop-types'
import { PlusOutlined, CloseOutlined, UndoOutlined } from '@ant-design/icons'

function Btnbox({ addData, reflash, deleteData, isShow = true }) {
 
  return (
    <div className="btnbox">
      <div>
        <Button icon={<PlusOutlined />} type="primary" onClick={() => addData()}>
          增加
        </Button>
        {isShow ? (
          <Button icon={<CloseOutlined />} danger className="del-btn" onClick={() => deleteData()}>
            删除
          </Button>
        ) : (
          ''
        )}
      </div>
      <Button icon={<UndoOutlined />} type="primary" onClick={() => reflash()}>
        刷新
      </Button>
    </div>
  )
}

Btnbox.propTypes = {
  addData: PropTypes.func.isRequired,
  reflash: PropTypes.func,
  deleteData: PropTypes.func.isRequired,
}

export default Btnbox
