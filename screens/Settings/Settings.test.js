import React from 'react';
import renderer from 'react-test-renderer';

import { Settings } from './Settings';

describe('<Settings />', () => {
    it('has something', () => {
        const tree = renderer.create(<Settings />).toJSON();
        expect(tree.children.length).toBe(1);
    });
});