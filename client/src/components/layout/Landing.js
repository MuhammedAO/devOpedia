import React from 'react'
import {Link} from 'react-router-dom'

export const Landing = () => {
    return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Dev-Opedia</h1>
          <p className="lead">
            Register. Share your knowledge & Xperiences . Connect with other devs.
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
            <Link to="/login" className="btn btn-light">Login</Link>
          </div>
        </div>
      </div>
    </section>
    )
}
