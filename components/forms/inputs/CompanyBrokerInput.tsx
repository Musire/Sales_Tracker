'use client';

import { DropdownButton } from "@/components/buttons";
import { ControlledInput } from "@/components/forms";
import { useFormContext, useWatch } from "react-hook-form";

type Props = {
  companies?: {
    id: string;
    name: string;
    users: {
      id: string;
      name: string;
    }[];
  }[];
};

export default function CompanyBrokerInput({ companies = [] }: Props) {
  const { control, setValue } = useFormContext();

  // 1. Watch selected company ID in real-time
  const selectedCompanyId = useWatch({ control, name: "companyId" });

  // 2. Find selected company object
  const selectedCompany = companies?.find((c) => c.id === selectedCompanyId);

  // 3. Extract brokers/users for selected company
  const availableBrokers = selectedCompany?.users ?? [];

  return (
    <div className="flex flex-col gap-4">
      {/* --- COMPANY DROPDOWN --- */}
      <ControlledInput
        name="companyId"
        label="Company"
        render={(field) => {
          const currentCompany = companies?.find((c) => c.id === field.value);
          const companyNames = companies?.map((c) => c.name) ?? [];

          return (
            <DropdownButton
              options={companyNames}
              value={currentCompany ? currentCompany.name : ""}
              onChange={(selectedName) => {
                const matchedCompany = companies?.find((c) => c.name === selectedName);
                const newCompanyId = matchedCompany ? matchedCompany.id : "";

                // Update form state with company ID (UUID)
                field.onChange(newCompanyId);

                // Reset broker selection when company changes
                setValue("createdById", "");
              }}
            />
          );
        }}
      />

      {/* --- BROKER AGENT DROPDOWN --- */}
      <ControlledInput
        name="createdById"
        label="Broker Agent"
        render={(field) => {
          const currentBroker = availableBrokers.find((b) => b.id === field.value);
          const brokerNames = availableBrokers.map((b) => b.name);

          return (
            <div className={!selectedCompanyId ? "opacity-50 pointer-events-none" : ""}>
              <DropdownButton
                options={brokerNames}
                value={currentBroker ? currentBroker.name : ""}
                onChange={(selectedName) => {
                  const matchedBroker = availableBrokers.find((b) => b.name === selectedName);
                  const newBrokerId = matchedBroker ? matchedBroker.id : "";

                  // Update form state with broker user ID (UUID)
                  field.onChange(newBrokerId);
                }}
              />
            </div>
          );
        }}
      />
    </div>
  );
}