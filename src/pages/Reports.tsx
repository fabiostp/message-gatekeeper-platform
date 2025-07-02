
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Download, TrendingUp, TrendingDown, Eye, MessageCircle, CheckCircle, XCircle } from "lucide-react";

const Reports = () => {
  const periodData = [
    { date: "01/01", enviados: 234, lidos: 187, respondidos: 45, bloqueados: 12 },
    { date: "02/01", enviados: 267, lidos: 223, respondidos: 67, bloqueados: 8 },
    { date: "03/01", enviados: 189, lidos: 156, respondidos: 34, bloqueados: 15 },
    { date: "04/01", enviados: 298, lidos: 251, respondidos: 78, bloqueados: 6 },
    { date: "05/01", enviados: 345, lidos: 289, respondidos: 89, bloqueados: 9 },
    { date: "06/01", enviados: 278, lidos: 234, respondidos: 56, bloqueados: 11 },
    { date: "07/01", enviados: 312, lidos: 267, respondidos: 72, bloqueados: 7 }
  ];

  const templatesPerformance = [
    { 
      id: 1, 
      name: "Promoção Black Friday", 
      enviados: 1247, 
      lidos: 1089, 
      respondidos: 234, 
      taxa_leitura: 87.3, 
      taxa_resposta: 18.8,
      status: "Ativo"
    },
    { 
      id: 2, 
      name: "Lembrete de Pagamento", 
      enviados: 892, 
      lidos: 756, 
      respondidos: 123, 
      taxa_leitura: 84.7, 
      taxa_resposta: 13.8,
      status: "Ativo"
    },
    { 
      id: 3, 
      name: "Boas-vindas Novos Clientes", 
      enviados: 567, 
      lidos: 489, 
      respondidos: 78, 
      taxa_leitura: 86.2, 
      taxa_resposta: 13.8,
      status: "Pausado"
    }
  ];

  const linesPerformance = [
    {
      name: "Linha Premium",
      enviados: 2456,
      entregues: 2389,
      lidos: 2134,
      respondidos: 456,
      bloqueados: 23,
      uptime: 99.8
    },
    {
      name: "Linha Business", 
      enviados: 1879,
      entregues: 1823,
      lidos: 1567,
      respondidos: 287,
      bloqueados: 34,
      uptime: 98.9
    },
    {
      name: "Linha Standard",
      enviados: 1234,
      entregues: 1198,
      lidos: 1023,
      respondidos: 189,
      bloqueados: 45,
      uptime: 97.2
    }
  ];

  const blockReasons = [
    { reason: "Limite de mensagens sem retorno", count: 45, percentage: 38.5 },
    { reason: "Intervalo mínimo não respeitado", count: 32, percentage: 27.4 },
    { reason: "Fora da janela de envio", count: 23, percentage: 19.7 },
    { reason: "Limite de uso da linha", count: 17, percentage: 14.5 }
  ];

  const pieColors = ["#ef4444", "#f97316", "#eab308", "#22c55e"];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
          <p className="text-gray-600">Análise detalhada de performance e métricas</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Select defaultValue="7d">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="1d">Hoje</SelectItem>
              <SelectItem value="7d">7 dias</SelectItem>
              <SelectItem value="30d">30 dias</SelectItem>
              <SelectItem value="90d">90 dias</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="lines">Linhas</TabsTrigger>
          <TabsTrigger value="blocks">Bloqueios</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Métricas principais */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Enviados</p>
                    <p className="text-2xl font-bold text-gray-900">1.923</p>
                    <div className="flex items-center text-green-600 text-sm">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +15% vs período anterior
                    </div>
                  </div>
                  <MessageCircle className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Taxa de Leitura</p>
                    <p className="text-2xl font-bold text-gray-900">86.4%</p>
                    <div className="flex items-center text-green-600 text-sm">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +2.3% vs período anterior
                    </div>
                  </div>
                  <Eye className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Taxa de Resposta</p>
                    <p className="text-2xl font-bold text-gray-900">16.2%</p>
                    <div className="flex items-center text-red-600 text-sm">
                      <TrendingDown className="h-4 w-4 mr-1" />
                      -1.1% vs período anterior
                    </div>
                  </div>
                  <MessageCircle className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Bloqueios</p>
                    <p className="text-2xl font-bold text-gray-900">68</p>
                    <div className="flex items-center text-green-600 text-sm">
                      <TrendingDown className="h-4 w-4 mr-1" />
                      -12% vs período anterior
                    </div>
                  </div>
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gráfico de evolução */}
          <Card>
            <CardHeader>
              <CardTitle>Evolução das Métricas</CardTitle>
              <CardDescription>Performance diária dos últimos 7 dias</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={periodData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Line type="monotone" dataKey="enviados" stroke="#3b82f6" strokeWidth={2} name="Enviados" />
                  <Line type="monotone" dataKey="lidos" stroke="#10b981" strokeWidth={2} name="Lidos" />
                  <Line type="monotone" dataKey="respondidos" stroke="#8b5cf6" strokeWidth={2} name="Respondidos" />
                  <Line type="monotone" dataKey="bloqueados" stroke="#ef4444" strokeWidth={2} name="Bloqueados" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Performance dos Templates</CardTitle>
              <CardDescription>Análise detalhada por template de mensagem</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template</TableHead>
                    <TableHead>Enviados</TableHead>
                    <TableHead>Taxa de Leitura</TableHead>
                    <TableHead>Taxa de Resposta</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templatesPerformance.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{template.name}</p>
                          <p className="text-sm text-gray-500">ID: {template.id}</p>
                        </div>
                      </TableCell>
                      <TableCell>{template.enviados.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span>{template.taxa_leitura}%</span>
                          </div>
                          <Progress value={template.taxa_leitura} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span>{template.taxa_resposta}%</span>
                          </div>
                          <Progress value={template.taxa_resposta} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={template.status === 'Ativo' ? 'default' : 'secondary'}
                          className={
                            template.status === 'Ativo' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }
                        >
                          {template.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {template.taxa_leitura > 85 ? (
                            <div className="flex items-center text-green-600">
                              <TrendingUp className="h-4 w-4 mr-1" />
                              Excelente
                            </div>
                          ) : (
                            <div className="flex items-center text-yellow-600">
                              <TrendingDown className="h-4 w-4 mr-1" />
                              Regular
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lines">
          <Card>
            <CardHeader>
              <CardTitle>Performance das Linhas</CardTitle>
              <CardDescription>Análise detalhada por linha WhatsApp</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Linha</TableHead>
                    <TableHead>Enviados</TableHead>
                    <TableHead>Entregues</TableHead>
                    <TableHead>Lidos</TableHead>
                    <TableHead>Respondidos</TableHead>
                    <TableHead>Bloqueados</TableHead>
                    <TableHead>Uptime</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {linesPerformance.map((line, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{line.name}</TableCell>
                      <TableCell>{line.enviados.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <span>{line.entregues.toLocaleString()}</span>
                          <div className="text-xs text-gray-500">
                            {((line.entregues / line.enviados) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <span>{line.lidos.toLocaleString()}</span>
                          <div className="text-xs text-gray-500">
                            {((line.lidos / line.entregues) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <span>{line.respondidos.toLocaleString()}</span>
                          <div className="text-xs text-gray-500">
                            {((line.respondidos / line.lidos) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-red-600">{line.bloqueados}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${
                            line.uptime > 99 ? 'bg-green-500' : 
                            line.uptime > 95 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                          <span>{line.uptime}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blocks">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Motivos de Bloqueio</CardTitle>
                <CardDescription>Distribuição dos motivos de bloqueio</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={blockReasons}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="count"
                      label={({ name, percentage }) => `${percentage}%`}
                    >
                      {blockReasons.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {blockReasons.map((reason, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: pieColors[index] }}
                      ></div>
                      <span className="text-sm text-gray-600">{reason.reason}</span>
                      <span className="text-sm font-medium">({reason.count})</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detalhes dos Bloqueios</CardTitle>
                <CardDescription>Quantidade e impacto de cada regra</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {blockReasons.map((reason, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{reason.reason}</span>
                      <span className="text-sm text-gray-600">{reason.count} bloqueios</span>
                    </div>
                    <Progress value={reason.percentage} className="h-2" />
                    <div className="text-xs text-gray-500">
                      {reason.percentage}% do total de bloqueios
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
