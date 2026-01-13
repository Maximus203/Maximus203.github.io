<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = [
            [
                'image' => '/assets/projets/image-converter.gif',
                'github' => 'https://github.com/Maximus203/image-converter',
                'category' => 'OpenSource',
                'featured' => true,
                'tags' => ['OpenSource', 'WebP', 'Performance'],
                'title' => [
                    'fr' => 'Image Converter',
                    'en' => 'Image Converter',
                    'zh' => 'Image Converter',
                    'ja' => 'Image Converter',
                ],
                'description' => [
                    'fr' => "Service Open Source de conversion d'images en WebP. Optimisation SEO et éco-conception.",
                    'en' => "Open Source service for WebP image conversion. SEO optimization and eco-design.",
                    'zh' => "WebP图像转换开源服务. SEO优化和生态设计.",
                    'ja' => "WebP画像変換オープンソースサービス. SEO最適化とエコデザイン.",
                ]
            ],
            [
                'image' => '/assets/projets/my-event-demo.gif',
                'github' => 'https://github.com/Maximus203/my-event-app',
                'category' => 'App',
                'featured' => true,
                'tags' => ['Laravel', 'React', 'Management'],
                'title' => [
                    'fr' => 'MyEvent',
                    'en' => 'MyEvent',
                    'zh' => 'MyEvent',
                    'ja' => 'MyEvent',
                ],
                'description' => [
                    'fr' => "Application complète de création et gestion d'événements.",
                    'en' => "Complete application for event creation and management.",
                    'zh' => "完整的活动创建和管理应用程序.",
                    'ja' => "イベント作成および管理のための完全なアプリケーション.",
                ]
            ],
            [
                'image' => '/assets/projets/Archive-ESTM.webp',
                'github' => null,
                'category' => 'Blockchain',
                'featured' => true,
                'tags' => ['Blockchain', 'Ethereum', 'Archivage'],
                'title' => [
                    'fr' => 'Archive ESTM',
                    'en' => 'Archive ESTM',
                    'zh' => 'Archive ESTM',
                    'ja' => 'Archive ESTM',
                ],
                'description' => [
                    'fr' => "Plateforme d'archivage des mémoires avec ancrage Blockchain Ethereum pour l'intégrité.",
                    'en' => "Thesis archiving platform with Ethereum Blockchain anchoring for integrity.",
                    'zh' => "基于以太坊区块链锚定的论文归档平台，确保完整性.",
                    'ja' => "完全性を確保するためのイーサリアムブロックチェーンアンカー付き論文アーカイブプラットフォーム.",
                ]
            ],
            [
                'image' => '/assets/projets/sap-demo.gif',
                'github' => null,
                'category' => 'SaaS',
                'featured' => true,
                'tags' => ['Spring Boot', 'Microservices', 'SaaS'],
                'title' => [
                    'fr' => 'Cynoia Spaces',
                    'en' => 'Cynoia Spaces',
                    'zh' => 'Cynoia Spaces',
                    'ja' => 'Cynoia Spaces',
                ],
                'description' => [
                    'fr' => "SaaS de gestion d'espaces collaboratifs. Architecture microservices (Spring Boot, Gateway).",
                    'en' => "Collaborative space management SaaS. Microservices architecture.",
                    'zh' => "协作空间管理SaaS. 微服务架构 (Spring Boot, Gateway).",
                    'ja' => "コラボレーションスペース管理SaaS. マイクロサービスアーキテクチャ (Spring Boot, Gateway).",
                ]
            ]
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
}
