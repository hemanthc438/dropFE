import { AccountType } from "@prisma/client";

declare module "better-auth" {
    interface User {
        accountType?: AccountType | null;
    }
}
