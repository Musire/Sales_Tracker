import { Building2 } from 'lucide-react';

export interface CompanyRanking {
  rank: number;
  name: string;
  revenue: string;
  architect: {
    name: string;
    initials: string;
    avatarUrl?: string;
  };
}

type Props = {
  data: CompanyRanking[]
}


export function CompanyRanking({ data }: Props) {
  return (
    <div className="bg-surface-1 flex-1 overflow-hidden rounded-xl p-4 border border-border flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold tracking-wider text-else uppercase">
          company revenue
        </h3>
        <Building2 className="w-4 h-4 text-else" />
      </div>

      {/* Table Structure */}
      <div className="w-full max-h-full overflow-y-auto scrollbar-none ">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
              <th className="sticky top-0 bg-surface-1 z-10 py-2 pr-2 w-8 text-center">#</th>
              <th className="sticky top-0 bg-surface-1 z-10 py-2 px-2">Company</th>
              <th className="sticky top-0 bg-surface-1 z-10 py-2 px-2 text-right">Revenue</th>
              <th className="sticky top-0 bg-surface-1 z-10 py-2 pl-2 text-center w-12">Arch</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50 text-xs">
            {data.map((company) => (
              <tr key={company.rank} className="hover:bg-zinc-800/30 transition-colors">
                {/* Rank */}
                <td className="py-2.5 pr-2 text-center font-bold text-else">
                  {company.rank}
                </td>

                {/* Company Name */}
                <td className="py-2.5 px-2 font-medium text-main truncate max-w-35">
                  {company.name}
                </td>

                {/* Revenue */}
                <td className="py-2.5 px-2 text-right font-semibold text-else">
                  {company.revenue}
                </td>

                {/* Architect Avatar */}
                <td className="py-2.5 pl-2 text-center">
                  <div 
                    title={company.architect.name}
                    className="w-7 h-7 rounded-full bg-linear-to-tr from-background to-smoke text-white font-semibold text-[10px] flex items-center justify-center mx-auto border border-zinc-700 shadow-sm"
                  >
                    {company.architect.avatarUrl ? (
                      <img 
                        src={company.architect.avatarUrl} 
                        alt={company.architect.name} 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      company.architect.initials
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}