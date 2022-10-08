
function PromissionCom (props) {
  const { roles, children } = props
  const role = '0'
  const hasPromission = roles.includes(role)
  return (
    hasPromission ? children : null
  )
}
PromissionCom.defaultProps = {
  roles: ['0']
  
}
export default PromissionCom