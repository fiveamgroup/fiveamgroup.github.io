import React from 'react';

function MainContent() {
  return (
    <div className="container mt-5 pt-5">
      <h2 className="text-center mb-4">Our Web Apps</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Drinking Game</h5>
              <p className="card-text">Play our exciting drinking game app.</p>
              <a href="5amgame/index.html" className="btn btn-primary">Go to App</a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Truth or Dare</h5>
              <p className="card-text">Classic truth or dare fun.</p>
              <a href="truth/index.html" className="btn btn-primary">Go to App</a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Ring of Fire [WIP]</h5>
              <p className="card-text">Our newest and most nostalgic game.</p>
              <a href="/rof" className="btn btn-primary">Go to App</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
