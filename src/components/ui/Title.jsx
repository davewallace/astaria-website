import React from 'react';
import PropTypes from 'prop-types';
import './Title.css';

class Title extends React.Component {

	// define allowed props across all instances of this type of component
  static propTypes = {
    level: PropTypes.number.isRequired,
    // Todo: allow src file to be displayed, with 'text' used as accessible alt
    src: PropTypes.string,
    defaultRootClassName: PropTypes.string,
    customRootClassNameSuffix: PropTypes.string
  }

  // define default props across all instances of this type of component
  static defaultProps = {
    defaultRootClassName: 'title'
  }

	render () {

		const self = this
		const TitleTag = `h${this.props.level}`

		function generateRootClassName () {
			return (self.props.customRootClassNameSuffix) ? self.props.defaultRootClassName + '-' + self.props.customRootClassNameSuffix : self.props.defaultRootClassName
		}

		return <TitleTag className={generateRootClassName()}>
            {this.props.children}
           </TitleTag>
	}
}

export default Title;
