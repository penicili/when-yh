import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page not-found-page">
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/">Go Back Home</Link>
    </div>
  )
}
