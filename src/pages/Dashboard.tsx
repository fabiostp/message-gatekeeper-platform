
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { MessageSquare, Shield, Clock, CheckCircle, AlertTriangle, Users } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Disparos Hoje",
      value: "1.247",
      change: "+12%",
      icon: MessageSquare,
      color: "text-blue-600"
    },
    {
      title: "Taxa de Aprovação",
      value: "94.2%",
      change: "+2.1%",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Bloqueios",
      value: "73",
      change: "-8%",
      icon: Shield,
      color: "text-red-600"
    },
    {
      title: "Linhas Ativas",
      value: "8",
      change: "0%",
      icon: Users,
      color: "text-purple-600"
    }
  ];

  const hourlyData = [
    { hora: "00:00", enviados: 12, bloqueados: 2 },
    { hora: "06:00", enviados: 45, bloqueados: 5 },
    { hora: "09:00", enviados: 156, bloqueados: 12 },
    { hora: "12:00", enviados: 234, bloqueados: 18 },
    { hora: "15:00", enviados: 189, bloqueados: 15 },
    { hora: "18:00", enviados: 267, bloqueados: 21 },
    { hora: "21:00", enviados: 178, bloqueados: 14 }
  ];

  const pieData = [
    { name: "Aprovados", value: 1174, color: "#10b981" },
    { name: "Bloqueados", value: 73, color: "#ef4444" }
  ];

  const lineUsage = [
    { nome: "Linha Premium", uso: 78, limite: 80 },
    { nome: "Linha Business", uso: 45, limite: 80 },
    { nome: "Linha Standard", uso: 92, limite: 80 },
    { nome: "Linha Express", uso: 23, limite: 80 }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Visão geral da plataforma de WhatsApp</p>
        </div>
        <Badge variant="outline" className="text-green-600 border-green-200">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          Sistema Online
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change} vs ontem</p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="activity" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="activity">Atividade por Hora</TabsTrigger>
          <TabsTrigger value="distribution">Distribuição</TabsTrigger>
          <TabsTrigger value="lines">Uso das Linhas</TabsTrigger>
        </TabsList>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Disparos por Horário</CardTitle>
              <CardDescription>Volume de mensagens enviadas e bloqueadas hoje</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hora" />
                  <YAxis />
                  <Bar dataKey="enviados" fill="#10b981" name="Enviados" />
                  <Bar dataKey="bloqueados" fill="#ef4444" name="Bloqueados" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Disparos</CardTitle>
              <CardDescription>Proporção entre mensagens aprovadas e bloqueadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-6 mt-4">
                {pieData.map((entry, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: entry.color }}
                    ></div>
                    <span className="text-sm text-gray-600">{entry.name}: {entry.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lines">
          <Card>
            <CardHeader>
              <CardTitle>Uso das Linhas WhatsApp</CardTitle>
              <CardDescription>Percentual de uso vs limite configurado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {lineUsage.map((line, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{line.nome}</span>
                    <span className="text-sm text-gray-600">{line.uso}% / {line.limite}%</span>
                  </div>
                  <Progress 
                    value={line.uso} 
                    className="h-2"
                  />
                  {line.uso >= line.limite * 0.9 && (
                    <div className="flex items-center text-amber-600 text-sm">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      Próximo ao limite
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
