import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Spinner = () => (
    <div className="flex justify-center my-2">
        <button type="button" className="rounded items-center" disabled>
            <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
            Loading todos...
        </button>
    </div>
);

const StyledDiv = styled.div`
    display: flex;
    justify-content: center;
    margin: 1rem 0;
`;

const StyledButton = styled.button`
    justify-items: center;
    border-radius: 9999px;
`;

const StyledIcon = styled(FontAwesomeIcon)`
    margin-right: 0.5rem;
    animation: spin 1s linear infinite;

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;
