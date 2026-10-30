import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>MCA & BCA Degree</h4>
                <h5>Sharda University & CCSU</h5>
              </div>
              <h3>2019-24</h3>
            </div>
            <p>
              Master of Computer Applications from Sharda University (Sep 2022 –
              May 2024) and Bachelor of Computer Applications from Chaudhary
              Charan Singh University (Aug 2019 – June 2022).
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Graphic Designer & Video Editor</h4>
                <h5>Riot Ecommerce Solutions</h5>
              </div>
              <h3>2024-25</h3>
            </div>
            <p>
              Designed social media creatives and reels to enhance brand
              presence. Edited engaging video content, produced founder podcast
              episodes, and maintained brand consistency across channels.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Graphic Designer & Video Editor</h4>
                <h5>i2a Technologies Pvt. Ltd.</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Designing high-impact social media posts, promotional travel
              flyers, and motion graphic reels for Trekhops. Editing long-form
              promotional videos with smooth transitions and compelling storytelling.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
