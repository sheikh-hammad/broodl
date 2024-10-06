// import type { Metadata } from "next";
// import Main from "@/components/Main";
// import Dashboard from "@/components/Dashboard";
// import Login from "@/components/Login";

// export const metadata: Metadata = {
//   title: "Broodl ⋅ Dashboard",
// };

// export default function DashboardPage() {
//   return (
//     <Main>
//       <Dashboard />
//     </Main>
//   );
// }


import Dashboard from "@/components/Dashboard";
import Loading from "@/components/Loading";
import Login from "@/components/Login";
import Main from "@/components/Main";

export const metadata = {
    title: "Broodl · Dashboard",
};

export default function DashboardPage() {

    return (
        <Main>
            <Dashboard />
        </Main>
    )
}
