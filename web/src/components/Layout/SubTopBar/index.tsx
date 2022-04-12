import { useLocation } from "react-router-dom";

// import SearchBar from "../../SearchBar";
// import NotificationIcon from "../../NotificationIcon";

// import error_icon from "../../../assets/icons/error_icon.png";
// import notification_icon from "../../../assets/icons/notification_icon.png";

export default function SubTopBar() {
  const pathname: string = useLocation().pathname;
  const category: string = pathname.split("/")[1] || "Home";
  const categoryFormated: string =
    category.charAt(0).toUpperCase() + category.slice(1);
  const product: string = pathname.split("/")[2];

  return (
    <div className="h-10 bg-grey-dark text-grey-light flex flex-row justify-between items-center mt-0.5">
      <div className="ml-2">
        <span>
          {categoryFormated} {product ? `/ ${product}` : ""}
        </span>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-row items-center space-x-2 mr-24">
          {/* <NotificationIcon
            nbNotifications={0}
            icon={notification_icon}
            className="h-6 w-6"
          />
          <NotificationIcon
            nbNotifications={0}
            icon={error_icon}
            className="h-6 w-6"
          /> */}
        </div>
        {/* <SearchBar /> */}
      </div>
    </div>
  );
}
