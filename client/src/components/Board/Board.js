import React, { Component } from "react";
import styled from "styled-components";
import { shuffle } from "../../utilities/utilities";

const tileWidth = 60;
const tileMargin = 1;

const StyledGrid = styled.div`
  display: ${(props) => (props.visible ? "grid" : "none")};
  max-width: ${(props) => props.cols * (tileWidth + tileMargin * 2) + "px"};
  grid-template-columns: repeat(${(props) => props.cols}, 1fr);
`;

const StyledButton = styled.div`
  background: white;
  display: block;
  border: none;
  border-radius: 5px;
  margin: ${tileMargin + "px"};
  font-size: 20px;
  width: ${tileWidth + "px"};
  height: ${tileWidth + "px"};
  cursor: pointer;
  position: relative;
  background-color: ${(props) =>
    props.index === props.activeId ? "#ffe897" : "white"};
  visibility: ${(props) => (props.empty ? "hidden" : "visible")};
  opacity: ${(props) => (props.locked ? "0.3" : "")};
  background-image: url(${(props) => props.img});
  background-position: center;
  background-size: 120%;
  outline: none;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  &:active {
    outline: none;
  }
`;

const StyledImg = styled.img`
  display: none;
`;

const StyledProgressBarWrapper = styled.div`
  display: ${(props) => (props.visible ? "block" : "none")};
  max-width: 240px;
  margin: 50px auto;
`;

const StyledOuterProgressBar = styled.div`
  width: 100%;
  height: 30px;
  border-radius: 20px;
  background: #c8e0ff;
  position: relative;
  overflow: hidden;
`;

const StyledInnerProgressBar = styled.div`
  width: 100%;
  height: 30px;
  background: #007bff;
  position: absolute;
  transform: ${(props) => props.scaleX};
  transform-origin: 0 50%;
  transition: transform 0.2s;
  top: 0;
  left: 0;
  z-index: 10;
`;

const StyledProgressNr = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  line-height: 1.7;
`;

export default class Board extends Component {
  state = {
    allImagesLoaded: false,
    loadedImagesNr: 0,
    randomNumbers: [],
  };

  componentDidMount() {
    console.log(this.props.tilesTotalNr);
    // generate list of random numbers between 1 and 300
    // it will be used to load random images
    let numbers = Array.from(Array(300).keys()).map((x) => ++x);
    numbers = shuffle(numbers).slice(0, 3);
    this.setState({
      randomNumbers: numbers,
    });
  }

  updateLoadingStatus = (total) => {
    const nr = this.state.loadedImagesNr + 1;
    this.setState({
      loadedImagesNr: nr,
    });
    if (nr === total) {
      console.log("all");
      this.setState({
        allImagesLoaded: true,
      });
    }
  };

  render() {
    const { allImagesLoaded, loadedImagesNr } = this.state;
    const {
      board,
      cols,
      handleClick,
      activeId,
      tilesTotalNr,
      randomNumbers,
    } = this.props;
    const { updateLoadingStatus } = this;

    return (
      <div className="flex">
        <div className="board">
          <StyledGrid cols={cols} visible={allImagesLoaded}>
            {board.map((el, index) => {
              const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                randomNumbers[el.value]
              }.png`;

              return (
                <StyledButton
                  img={url}
                  locked={el.locked}
                  index={index}
                  activeId={activeId}
                  empty={el.empty}
                  onClick={() => handleClick(index)}
                  key={index}
                >
                  <StyledImg
                    src={url}
                    alt=""
                    onLoad={() => updateLoadingStatus(tilesTotalNr)}
                  />
                </StyledButton>
              );
            })}
          </StyledGrid>
          <StyledProgressBarWrapper visible={!allImagesLoaded}>
            <StyledProgressNr>Loading images...</StyledProgressNr>
            <StyledOuterProgressBar>
              <StyledInnerProgressBar
                scaleX={`scaleX(${loadedImagesNr / tilesTotalNr})`}
              />
            </StyledOuterProgressBar>
            <StyledProgressNr>
              {Math.floor((loadedImagesNr / tilesTotalNr) * 100) + "%"}
            </StyledProgressNr>
          </StyledProgressBarWrapper>
        </div>
      </div>
    );
  }
}
