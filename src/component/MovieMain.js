import React, {Component, Fragment} from 'react';
import axios from 'axios';  // 외부 서버에서 데이터 읽기
import {Zoom} from 'react-slideshow-image';

class MovieMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title:'박스오피스',
            movie_data: [],
            movie_detail: {},
            open: false,

        };

    }
    // state 에 대한 초기값 설정
    //없어질 예정임 => componentDidMount 대신 써라
    /*componentWillMount() {
        var _this = this;
       axios.get('http://localhost:3355/movie', {
            params: {
                no:1
            }
        }).then(function (res) {
            //console.log(res.data);
            _this.setState({movie_date:res.data});
        })

      /!*  axios.get('http://localhost:3355/movie', {
            params: {
                no:1
            }
        }).then((res) => {
            console.log(res.data);
        })*!/
    }*/

    componentDidMount() {
        var _this = this;
        axios.get('http://localhost:3355/movie', {
            params: {
                no:1
            }
        }).then(function (res) {
            //console.log(res.data);


            _this.setState({movie_data:res.data});
        })

        /*  axios.get('http://localhost:3355/movie', {
              params: {
                  no:1
              }
          }).then((res) => {
              console.log(res.data);
          })*/
    }

    onBtnClick(no) {
        var _this = this;
        axios.get('http://localhost:3355/movie', {
            params: {
                no:no
            }
        }).then(function(response) {
            _this.setState({movie_data:response.data})
        });

        if(no === 1) {
            this.setState({title:'박스오피스'})
        }else if(no === 2) {
            this.setState({title:'실시간예매율'})
        }else if(no === 3) {
            this.setState({title:'좌석점유율'})
        }else if(no === 4) {
            this.setState({title:'온라인이용순위'})
        }
    }

    onMovieDetail(m) {
        this.setState({movie_detail:m, open:true});
    }

    render() {
        const style={
            "margin":"0px auto",
            "width" : "1600px"
        }

        //jsx coding
        const html = this.state.movie_data.map((m) =>
            <tr key={m.movieCd} onClick={this.onMovieDetail.bind(this, m)}>
                <td><img src={"http://www.kobis.or.kr/"+m.thumbUrl} width={"35"} height={"35"} /> </td>
                <td>{m.movieNm}</td>
                <td>{m.genre}</td>
                <td>{m.openDt}</td>
            </tr>
        )

        return(
            <Fragment>
                <div className={"row"} style={style}>
                    <SlideShow images={this.state.movie_data}></SlideShow>
                </div>

                <div className={"row"} style={style}>
                    <h1 className={"text-center"}>{this.state.title}</h1>
                </div>

                <div className={"row"} style={style}>
                    <div className={"col-sm-5"}>
                        {this.state.open? <MovieDetail m={this.state.movie_detail}></MovieDetail> : null}
                    </div>
                    <div className={"col-sm-7"}>
                        <table className={"table table-striped"}>
                            <thead>
                                <tr className={"success"}>
                                    <th></th>
                                    <th>영화명</th>
                                    <th>장르</th>
                                    <th>개봉일</th>
                                </tr>
                            </thead>

                            <tbody>
                            {html}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className={"row"} style={style}>
                    <input type={"button"} className={"btn btn-sm btn-primary"} value={"박스오피스"} onClick={this.onBtnClick.bind(this, 1)}/>
                    <input type={"button"} className={"btn btn-sm btn-primary"} value={"실시간예매율"} onClick={this.onBtnClick.bind(this, 2)}/>
                    <input type={"button"} className={"btn btn-sm btn-primary"} value={"좌석점유율"} onClick={this.onBtnClick.bind(this, 3)}/>
                    <input type={"button"} className={"btn btn-sm btn-primary"} value={"온라인이용순위"} onClick={this.onBtnClick.bind(this, 4)}/>
                </div>
            </Fragment>
        )
    }
}

class MovieDetail extends Component {
    render() {
        return (
            <div>
                <table className={"table"}>
                    <tbody>
                        <tr>
                            <td width={"30%"} className={"text-center"} rowSpan={"9"}>
                                <img src={"http://www.kobis.or.kr/"+ this.props.m.thumbUrl.replace('thumb', 'thumb_x289')} width={"289"} height={"410"}></img>
                            </td>
                            <td colSpan={"2"} className={"text-center"}>
                                <h3>{this.props.m.movieNm}</h3>
                                <sub style={{"color":"gray"}}>{this.props.m.movieNmEn}</sub>
                            </td>
                        </tr>
                        <tr>
                            <td width={"15%"} className={"text-right"}><b>개봉일</b></td>
                            <td width={"55%"} className={"text-left"}>{this.props.m.openDt}</td>
                        </tr>
                        <tr>
                            <td width={"15%"} className={"text-right"}><b>제작상태</b></td>
                            <td width={"55%"} className={"text-left"}>{this.props.m.moviePrdtStat}</td>
                        </tr>
                        <tr>
                            <td width={"15%"} className={"text-right"}><b>영화구분</b></td>
                            <td width={"55%"} className={"text-left"}>{this.props.m.moveType}</td>
                        </tr>
                        <tr>
                            <td width={"15%"} className={"text-right"}><b>관람등급</b></td>
                            <td width={"55%"} className={"text-left"}>{this.props.m.watchGradeNm}</td>
                        </tr>
                        <tr>
                            <td width={"15%"} className={"text-right"}><b>상영시간</b></td>
                            <td width={"55%"} className={"text-left"}>{this.props.m.showTm}</td>
                        </tr>
                        <tr>
                            <td width={"15%"} className={"text-right"}><b>제작국가</b></td>
                            <td width={"55%"} className={"text-left"}>{this.props.m.repNationCd}</td>
                        </tr>
                        <tr>
                            <td width={"15%"} className={"text-right"}><b>감독</b></td>
                            <td width={"55%"} className={"text-left"}>{this.props.m.director}</td>
                        </tr>
                        <tr>
                            <td width={"15%"} className={"text-right"}><b>장르</b></td>
                            <td width={"55%"} className={"text-left"}>{this.props.m.genre}</td>
                        </tr>
                        <tr>
                            <td colSpan={"3"} className={"text-left"}>{this.props.m.synop}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

class SlideShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            properties: {
                duration: 500,
                transitionDuration:500,
                infinite: true,
                indicators: true,
                scale: 0.4,
                arrows: true
            }
        }
    }
    //
    // componentWillMount() {
    //     this.setState({images:this.props.images})
    // }

    /*
    spread operator : ...
     */
    render() {
        return (
            <div className={"slide-container"} style={{"margin":"0px auto", "width":"289px"}}>
                <Zoom {...this.state.properties}>
                    {
                        this.props.images.map((m, index) =>
                            <img src={"http://www.kobis.or.kr/" + m.thumbUrl.replace('thumb', 'thumb_x289')} key={index} style={{"width":"100%", "height":"410px"}}/>
                        )
                    }
                </Zoom>
            </div>
        );
    }
}

export default MovieMain