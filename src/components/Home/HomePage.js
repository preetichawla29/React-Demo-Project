import React, { Component } from 'react'
import HomePageData from '../homePageData.json';
import { Link} from 'react-router-dom';

export default class HomePage extends Component {
    render() {
        // const homePageData =
        return (
            <div className="homepage">
								<ul>
								{HomePageData.map((homeDetail, i) =>
									<li>
										<h2>{homeDetail.title}</h2>
											<p dangerouslySetInnerHTML= {{ __html: homeDetail.desc}} />
											<video width="300" height="170" controls >
												<source src={homeDetail.videoLink} type="video/mp4"/>
											</video>
											<iframe src={homeDetail.embeddedLink} width="300" height="170"></iframe>
								{/* <Link to={homeDetail.embeddedLink}></Link> */}
									</li>
								)}
									</ul>
            </div>
        )
    }
}
