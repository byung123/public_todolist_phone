/** @jsxImportSource @emotion/react */
import * as s from "./style";

function DashboardListItem({ title, children }) {
    return (
        <div>
            <div css={s.layout}>
                <h3 css={s.title}>{title}</h3>
                { children }
            </div>
        </div>
    );
}

export default DashboardListItem;