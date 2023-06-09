import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Footer = () => {
  const location = useLocation()
  return (
    <div>
      <p>Copyright &copy; 2023</p>      
      {location.pathname === '/' && (
        <Link to='/about'>About</Link>
      )}      
    </div>
  )
}

export default Footer